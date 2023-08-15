const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        const blogNew = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        console.log('New blog created:', blogNew);

        res.status(200).json(blogNew);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dataBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!dataBlog) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(dataBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const dataBlog = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(dataBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;