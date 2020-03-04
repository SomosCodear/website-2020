import R from 'ramda';
import Jsona from 'jsona';

const formatter = new Jsona();

export const deserialize = R.compose(
  R.map(R.dissoc('relationshipNames')),
  R.bind(formatter.deserialize, formatter),
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

export const serialize = (type, {
  data,
  typeMapping = {},
  nestedIdentifiers = [],
}) => {
  const serialized = R.mapObjIndexed((value, key) => {
    let serializedValue = value;

    if (R.type(value) === 'Object') {
      serializedValue = serialize(typeMapping[key], {
        data: value,
        typeMapping,
        nestedIdentifiers,
      });
    } else if (nestedIdentifiers.contains(key)) {
      serializedValue = buildJSONApiIdentifier(key, value);
    }

    return serializedValue;
  })(data);

  return buildJSONApiPayload(type, serialized);
};
