export const buildCustomerAuthenticationHeaders = (email, identityDocument) => ({
  Authorization: `Customer ${email} ${identityDocument}`,
});
