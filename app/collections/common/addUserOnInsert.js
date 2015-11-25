export default function(operation) {
  if (operation.isInsert && operation.userId) {
    return operation.userId;
  }

  if (operation.isUpdate) {
    operation.unset();
  }
}
