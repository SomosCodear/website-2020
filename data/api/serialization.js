import R from 'ramda';
import { paramCase, camelCase } from 'change-case';
import { deserialize as baseDeserialize } from 'deserialize-json-api';

const applyCasing = (casing) => R.compose(
  R.fromPairs,
  R.map(R.adjust(0, casing)),
  R.toPairs,
);

const applyNestedCasing = R.curry(
  (casing, object) => R.compose(
    applyCasing(casing),
    R.map((value) => {
      let result = value;

      if (R.type(value) === 'Object') {
        result = applyNestedCasing(casing, value);
      }

      return result;
    }),
  )(object),
);

const buildJSONApiIdentifier = R.curry(
  (type, id) => ({
    type,
    id,
  }),
);

const buildJSONApiResource = R.curry(
  (type, attributes) => ({
    type,
    attributes,
  }),
);

export const deserialize = R.compose(
  (data) => (
    R.type(data) === 'Object'
      ? applyNestedCasing(camelCase, data)
      : data.map(applyNestedCasing(camelCase))
  ),
  R.prop('data'),
  baseDeserialize,
);

export const baseSerialize = ({
  type,
  data,
  typeMapping = {},
  nestedIdentifiers = [],
}) => R.compose(
  applyCasing(paramCase),
  buildJSONApiResource(type),
  R.mapObjIndexed((value, key) => {
    const serializationContext = {
      type: typeMapping[key],
      typeMapping,
      nestedIdentifiers,
    };
    let serializedValue = value;

    switch (R.type(value)) {
      case 'Object':
        serializedValue = baseSerialize({
          ...serializationContext,
          data: value,
        });
        break;
      case 'Array':
        serializedValue = value.map((item) => baseSerialize({
          ...serializationContext,
          data: item,
        }));
        break;
      default:
        if (nestedIdentifiers.includes(key)) {
          serializedValue = buildJSONApiIdentifier(serializationContext.type, value);
        }
    }

    return serializedValue;
  }),
)(data);

export const serialize = (data) => R.compose(
  applyCasing(paramCase),
  (serialized) => ({ data: serialized }),
  baseSerialize,
)(data);
