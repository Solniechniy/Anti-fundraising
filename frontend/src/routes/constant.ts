export const APP_ROUTES = {
  HOME: '/',
  CASE_BY_ID: '/:id',
  DEFAULT: '*',
};

export const toAuction = (id: number) => APP_ROUTES.HOME + id;
