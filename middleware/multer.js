import multer from "multer";

storage = multer.memoryStorage()

const upload = multer({
    storage: storage
})

module.exports = upload