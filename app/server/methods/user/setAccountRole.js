export default function(roles) {
  return (userId, role) => {
    roles.addUsersToRoles(userId, role);
  };
}
