import R from 'ramda';
import { paramCase, camelCase } from 'change-case';
import { deserialize as baseDeserialize } from 'deserialize-json-api';
import { RELATIONSHIP_DEFINITIONS } from './resources';

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

export const baseSerialize = (type, data, rootType = type) => R.compose(
  buildJSONApiResource(type),
  applyCasing(paramCase),
  R.mapObjIndexed((value, key) => {
    const { nestedType, isIdentifier } = R.compose(
      R.defaultTo({}),
      R.path([rootType, key]),
    )(RELATIONSHIP_DEFINITIONS);
    let serializedValue = value;

    if (isIdentifier) {
      serializedValue = buildJSONApiIdentifier(nestedType, value);
    } else if (nestedType != null && R.type(value) === 'Array') {
      serializedValue = value.map((item) => baseSerialize(nestedType, item, rootType));
    } else if (nestedType != null) {
      serializedValue = baseSerialize(nestedType, value);
    }

    return serializedValue;
  }),
)(data);

export const serialize = (type, data) => R.compose(
  applyCasing(paramCase),
  (serialized) => ({ data: serialized }),
  baseSerialize,
)(type, data);
