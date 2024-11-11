export const testPostController = async (req, res) => {
    const { name } = req.body;
    res.status(200).send(`Your Name is ${name}`)
};

