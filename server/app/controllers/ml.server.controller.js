const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node');


const modelSaveLocation = "./app/ml/model/heart_disease/model.json";

exports.heartDiseasePredict = async (req, res) => {
  let data = req.body;
  console.log(data);

  console.log("Loading model...");
  //const model = require('./model/heart_disease/model.json');
  const handler = tfn.io.fileSystem("./app/ml/model/heart_disease/model.json");


  
  const model = await tf.loadLayersModel(handler);
 // const model = await tf.loadLayersModel(`file://` + modelSaveLocation);
 
  console.log("Model loaded", model);
  const testData = [req.body];

  console.log("Testing data", testData);

  const testingData = tf.tensor2d(
    testData.map((attr) => [
      attr.age,
      attr.cp,
      attr.sex,
      attr.trestbps,
      attr.chol,
      attr.thalach,
      attr.fbs,
      attr.exang,
    ])
  );

  const results = model.predict(testingData);

  // print results
// Convert results to array
const resultArray = await results.array();
console.log(resultArray[0][0])
// Send the response
res.status(200).json(
  {result: resultArray[0][0] });
};
