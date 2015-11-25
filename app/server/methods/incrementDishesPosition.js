export default function(dishCollection) {
  return (mealId, startPosition, value = 1) => {
    // Update the position of the dishes which are at that position or after it
    dishCollection.direct.update({
      mealId,
      position: {
        $gte: startPosition,
      },
    }, {
      $inc: {
        position: value,
      },
    }, {
      multi: true,
    });
  };
}
