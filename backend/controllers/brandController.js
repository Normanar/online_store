class BrandController {

    async create (req, res) {

    }

    async getAll (req, res) {
        res.json("Brand")
    }
}

module.exports = new BrandController()