const UserRoleValues = Object.freeze({
  ADMIN: "ADMIN",
  USER: "USER",
});

const AvailableUserRoles = Object.freeze(Object.values(UserRoleValues));

module.exports = {
  UserRoleValues,
  AvailableUserRoles,
};
