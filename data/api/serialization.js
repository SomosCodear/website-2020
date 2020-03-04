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

const buildJSONApiIdentifier = (type, id) => ({
  type,
  id,
});

const buildJSONApiResource = (type, attributes) => ({
  type,
  attributes,
});


const buildJSONApiPayload = (type, data) => ({
  data: buildJSONApiResource(type, data),
});

export const deserialize = R.compose(
  (data) => (
    R.type(data) === 'Object'
      ? applyNestedCasing(camelCase, data)
      : data.map(applyNestedCasing(camelCase))
  ),
  R.prop('data'),
  baseDeserialize,
);

export const serialize = ({
  type,
  data,
  typeMapping = {},
  nestedIdentifiers = [],
}) => {
  const serialized = R.compose(
    applyCasing(paramCase),
    R.mapObjIndexed((value, key) => {
      let serializedValue = value;

      if (R.type(value) === 'Object') {
        serializedValue = serialize({
          type: typeMapping[key],
          data: value,
          typeMapping,
          nestedIdentifiers,
        });
      } else if (nestedIdentifiers.includes(key)) {
        serializedValue = buildJSONApiIdentifier(key, value);
      }

      return serializedValue;
    }),
  )(data);

  return buildJSONApiPayload(type, serialized);
};
