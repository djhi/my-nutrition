export default function(mealCollection) {
  return (userId, dateStart, dateEnd) => {
    return mealCollection.find({
      userId,
      date: {
        $gte: dateStart,
        $lte: dateEnd,
      },
    }, {
      sort: {
        date: 1,
      },
    });
  };
}
