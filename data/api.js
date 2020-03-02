import R from 'ramda';
import fetch from 'isomorphic-unfetch';
import Jsona from 'jsona';
import { API_URL } from './config';

const headers = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};
const formatter = new Jsona();

const deserialize = R.compose(
  R.map(R.dissoc('relationshipNames')),
  R.bind(formatter.deserialize, formatter),
);

const appendParameters = (urlObject, params) => {
  if (params.filter != null) {
    Object.keys(params.filter).forEach((key) => {
      const filterKey = `filter[${key}]`;
      const filterValue = params.filter[key];

      urlObject.searchParams.append(filterKey, filterValue);
    });
  }

  if (params.includes != null) {
    const include = params.include.join(',');
    urlObject.searchParams.append('include', include);
  }
};

const makeURL = (resource, params) => {
  const url = `${API_URL}/${resource}/`;
  const urlObject = new URL(url);

  if (params != null) {
    appendParameters(urlObject, params);
  }

  return urlObject;
};

const findAll = async (resource, params) => {
  const url = makeURL(resource, params).toString();
  const response = await fetch(url, {
    headers,
  });

  const json = await response.json();
  return deserialize(json);
};

export const api = {
  findAll,
};
