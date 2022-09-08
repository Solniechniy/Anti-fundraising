export const APP_ROUTES = {
  HOME: '/',
  CASE_BY_ID: '/:id',
  DEFAULT: '*',
};

export const toCase = (id: number) => APP_ROUTES.CASE_BY_ID + id;
