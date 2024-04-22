const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const namer = require("color-namer");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 8e8b948d4d9342989e4c43b40340473d");

const Clarifai = require("clarifai");

const handleAPICall = (req, res) => {
  const { imageUrl, keyword } = req.body;
  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
      model_id: "eeed0b6733a644cea07cf4c60f87ebb7",
      inputs: [{ data: { image: { url: imageUrl } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log(
          "Received failed status: " +
            response.status.description +
            "\n" +
            response.status.details
        );
        return;
      }

      const colorArray = [];
      for (const c of response.outputs[0].data.colors) {
        const hex = c.raw_hex.toUpperCase();
        const name = namer(hex).ntc[0].name;

        colorArray.push({
          name: name,
          hex: hex,
          probability: c.value,
        });
      }
      res.json(colorArray);
    }
  );
};

module.exports = {
  handleAPICall,
};
