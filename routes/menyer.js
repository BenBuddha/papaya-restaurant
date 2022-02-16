const express = require('express')
const { route } = require('express/lib/application')
const { append } = require('express/lib/response')
const Meny = require('./../models/meny')
const router = express.Router()

router.get('/ny', (req, res) => {
    res.render('admin/ny', { meny: new Meny() })
})


router.get('/redigera/:id', async (req, res) => {
    const meny = await Meny.findById(req.params.id)
    res.render('admin/redigera', { meny: meny})
})



router.get('/:slug', async (req, res) => {
    const meny = await Meny.findOne({ slug: req.params.slug })
    if (meny == null) res.redirect('/')
    res.render('admin/show', { meny: meny })
})



router.post('/meny', async (req, res, next) => {
    req.meny = new Meny()
    next()
}, saveArticleAndRedirect('ny'))


router.put('/:id', async (req, res, next) => {
    req.meny = await Meny.findById(req.params.id)
    next()
}, saveArticleAndRedirect('redigera'))



router.delete('/:id', async (req, res) => {
    await Meny.findByIdAndDelete(req.params.id)
    res.redirect('/admin')
})



function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let meny = req.meny
        meny.vecka = req.body.vecka
        meny.mondag1 = req.body.mon1
        meny.mondag2 = req.body.mon2
        meny.mondag3 = req.body.mon3
        meny.tisdag1 = req.body.tis1
        meny.tisdag2 = req.body.tis2
        meny.tisdag3 = req.body.tis3
        meny.onsdag1 = req.body.ons1
        meny.onsdag2 = req.body.ons2
        meny.onsdag3 = req.body.ons3
        meny.torsdag1 = req.body.tor1
        meny.torsdag2 = req.body.tor2
        meny.torsdag3 = req.body.tor3
        meny.fredag1 = req.body.fre1
        meny.fredag2 = req.body.fre2
        meny.fredag3 = req.body.fre3
        meny.dagdatum = req.body.dagd
        meny.dagens1 = req.body.dag1
        meny.dagens2 = req.body.dag2
        meny.dagens3 = req.body.dag3
        try {
            meny = await meny.save()
            res.redirect(`/admin/${meny.slug}`)
        } catch (e) {
            res.render(`admin/${path}`, { meny: meny })
        }
    }
}

module.exports = router