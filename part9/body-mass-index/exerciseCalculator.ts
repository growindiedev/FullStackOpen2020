interface stats  {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
  


const calculateExercises = (exercises: any[], target:number):stats => {
    
    let average = exercises.reduce((acc, b) => acc + b, 0)
    let rating: number;
    let ratingDescription: string;
        if (average < target) {
            rating = 1;
            ratingDescription = `Too bad you didn't reach your exercise goals this week, try again next week`;
        } else if (target === average) {
            rating = 2;
            ratingDescription = `Well done, you accomplished your exercise goals for this week!`;
        } else if (average > target) {
            rating = 3;
            ratingDescription = `Wooh, you did exercise more than you planned. Well done!`;
        } 
    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(num => num > 0).length,
        success: average >= target,
        rating: rating!,
        ratingDescription: ratingDescription!,
        target: target,
        average: average
    }
}

// const week = process.argv.splice(2, 7)
// const target =  Number(process.argv[process.argv.length - 1])

// console.log(calculateExercises(week, target))

export default calculateExercises