interface results  {
  weight: number,
  height: number,
  bmi: string
}

const calculateBmi = (height: number, weight: number): results => {
    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi < 15) {
      console.log("Very severely underweight");
      return  {
        weight: weight,
        height: height,
        bmi: "Very severely underweight"
      };
    } else if (bmi >= 15 && bmi < 16) {
      console.log("Severely underweight");
      return  {
        weight: weight,
        height: height,
        bmi: "Severely underweight"
      };
    } else if (bmi >= 16 && bmi < 18.5) {
      console.log("Underweight");
      return  {
        weight: weight,
        height: height,
        bmi: "underweight"
      };;
    } else if (bmi >= 18.5 && bmi < 25) {
      console.log("Normal (healthy weight)");
      return  {
        weight: weight,
        height: height,
        bmi: "Normal (healthy weight)"
      };
    } else if (bmi >= 25 && bmi < 30) {
      console.log("Overweight");
      return {
        weight: weight,
        height: height,
        bmi: "Overweight"
      };
    } else if (bmi >= 30 && bmi < 35) {
      console.log("Obese Class I (Moderately obese)");
      return  {
        weight: weight,
        height: height,
        bmi: "Obese Class I (Moderately obese)"
      };
      } else if (bmi >= 35 && bmi < 40) {
      console.log("Obese Class II (Severely obese)");
      return  {
        weight: weight,
        height: height,
        bmi: "Obese Class II (Severely obese)"
      };
    } else if (bmi >= 40) {
      console.log("Obese Class III (Very severely obese)");
      return  {
        weight: weight,
        height: height,
        bmi: "Obese Class III (very severly obese)"
      };
    }
    return  {
      weight: weight,
      height: height,
      bmi: "Parameters missing"
    };

}

export default calculateBmi

//console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))