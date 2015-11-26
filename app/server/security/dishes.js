/**
 * Apply the security rules on the Dish collection
 */
export default function(dishCollection) {
  dishCollection.allow({
    insert: (userId, doc) => userId === doc.userId,
    update: (userId, doc, fieldNames) => userId === doc.userId && !fieldNames.some(field => field === 'userId'),
    remove: (userId, doc) => userId === doc.userId,
  });
}
