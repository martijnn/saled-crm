var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid');

var LeadSchema = new Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    priority: number,
    company_name: String,
    person_responsible: String,
    status: {
        type : String,
        enum: [
            'Open',
            'Gesloten',
            'Onderhanden'
        ],
        default: 'Open'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Lead', LeadSchema);