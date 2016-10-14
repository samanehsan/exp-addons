import Ember from 'ember';
import ExpFrameBaseComponent from 'exp-player/components/exp-frame-base';
import layout from './template';
import {validator, buildValidations} from 'ember-cp-validations';
import config from 'ember-get-config';


function getLength(value) {
    var length = 0;
    if (value !== undefined) {
        length = value.length;
    }
    return length.toString();
}

var presence = validator('presence', {
    presence: true,
    message: 'This field is required'
});

const Validations = buildValidations({
    q1: presence,
    q2: presence,
    q3: presence
});

export default ExpFrameBaseComponent.extend(Validations, {
    type: 'exp-free-response',
    layout: layout,
    i18n: Ember.inject.service(),
    diff1: Ember.computed('q1', function() {
        var length = getLength(this.get('q1'));
        var message = this.get('i18n').t('survey.sections.2.questions.11.characterCount').string;
        message = message.replace("0", length.toString());
        return message;
    }),
    diff2: Ember.computed('q2', function() {
        var length = getLength(this.get('q2'));
        var message = this.get('i18n').t('survey.sections.2.questions.12.characterCount').string;
        message = message.replace("0", length.toString());
        return message;
    }),
    diff3: Ember.computed('q3', function() {
        var length = getLength(this.get('q3'));
        var message = this.get('i18n').t('survey.sections.2.questions.13.characterCount').string;
        message = message.replace("0", length.toString());
        return message;
    }),
    placeholder: Ember.computed(function() {
        return this.get('i18n').t('global.selectUnselected').string;
    }),
    times: [
            '12:00PM 12:00',
            '1:00PM 13:00',
            '2:00PM 14:00',
            '3:00PM 15:00',
            '4:00PM 16:00',
            '5:00PM 17:00',
            '6:00PM 18:00',
            '7:00PM 19:00',
            '8:00PM 20:00',
            '9:00PM 21:00',
            '10:00PM 22:00',
            '11:00PM 23:00',
            '12:00AM 00:00'],

    value: null,

    responses: Ember.computed('q1', 'q2', 'q3', function() {
        return {
            q1: this.get('q1'),
            q2: this.get('q2'),
            q3: this.get('q3')
        };
    }),

    allowNext: Ember.computed('validations.isValid', function() {
        if (config.validate) {
            return this.get('validations.isValid');
        }
        return true;
    }),

    meta: {
        name: 'ExpFreeResponse',
        description: 'TODO: a description of this frame goes here.',
        parameters: {
            type: 'object',
            properties: {
                // define parameters here
            }
        },
        data: {
            type: 'object',
            properties: {
                responses: {
                    type: 'object',
                    properties: {
                        q1: {
                            type: 'string'
                        },
                        q2: {
                            type: 'string'
                        },
                        q3: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    },
    actions: {
        continue() {
            if (this.get('allowNext')) {
                this.send('next');
            }
        }
    },
    loadData: function(frameData) {
        var responses = frameData.responses;
        this.set('q1', responses.q1);
        this.set('q2', responses.q2);
        this.set('q3', responses.q3);
    }
});
