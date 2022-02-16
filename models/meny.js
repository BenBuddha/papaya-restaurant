const mongoose = require('mongoose')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)


const menySchema = new mongoose.Schema({
    vecka: {
        type: String,
        required: true
    },
    mondag1: {
        type: String,
        required: true
    },
    mondag2: {
        type: String,
        required: false
    },
    mondag3: {
        type: String,
        required: false
    },
    tisdag1: {
        type: String,
        required: true
    },
    tisdag2: {
        type: String,
        required: false
    },
    tisdag3: {
        type: String,
        required: false
    },
    onsdag1: {
        type: String,
        required: true
    },
    onsdag2: {
        type: String,
        required: false
    },
    onsdag3: {
        type: String,
        required: false
    },
    torsdag1: {
        type: String,
        required: true
    },
    torsdag2: {
        type: String,
        required: false
    },
    torsdag3: {
        type: String,
        required: false
    },
    fredag1: {
        type: String,
        required: true
    },
    fredag2: {
        type: String,
        required: false
    },
    fredag3: {
        type: String,
        required: false
    },
    dagdatum: {
        type: String,
        required: false
    },
    dagens1: {
        type: String,
        required: false
    },
    dagens2: {
        type: String,
        required: false
    },
    dagens3: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
    //sanitized: {
    //    type: String,
    //    required: true
    //}
})

menySchema.pre('validate', function(next) {
    if (this.vecka) {
        this.slug = slugify(this.vecka, { lower: true,
        strict: true })
    }
    /*if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }*/
    next()
})

module.exports = mongoose.model('Meny', menySchema)