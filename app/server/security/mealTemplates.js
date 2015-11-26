/**
 * Apply the security rules on the MealTemplate collection
 */
export default function(mealTemplateCollection) {
  mealTemplateCollection.allow({
    insert: (userId, doc) => userId === doc.userId,
    update: (userId, doc, fieldNames) => userId === doc.userId && !fieldNames.some(field => field === 'userId'),
    remove: (userId, doc) => userId === doc.userId,
  });
}
