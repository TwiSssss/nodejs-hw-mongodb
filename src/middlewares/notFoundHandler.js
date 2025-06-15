export const notFoundHandler = (req, res) => {
    res.status(404).json({
        message: "Not Found",
        status: 404,
    });
};
