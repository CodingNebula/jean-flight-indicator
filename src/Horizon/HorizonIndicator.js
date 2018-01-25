define(["Inheritance", "IndicatorBase", "text!horizon-html"], function (Inheritance, IndicatorBase, html) { // jscs:ignore
    /**
     * Provides functionalty for displaying pedal movement values
     * @alias HorizonIndicator 
     * @constructor
     * @extends IndicatorBase
     * @param {Object} options - options object
     */
    var HorizonIndicator = function (options) {
        var instance = this;
        options.template = html;
        Inheritance.inheritConstructor(IndicatorBase, this, options);
        this.init({  
            svgId: "horizon-svg",
            svgDataName: "horizon.svg",
            onSvgReady: function () { // jscs:ignore
                instance.horizonElement = instance.svgElement.getElementById("horizon-element");
                instance.horizonElement.setAttribute("transform", "");
            }
        });
        this.pixelBounds = {
            PITCH_MAX: 128,
            PITCH_MIN: -128,
            PIXELS_PER_PITCH: 128 / 40
        };
        this.valueBounds = {
            PITCH_MAX: 40,
            PITCH_MIN: -40,

            ROLL_MAX: 30,
            ROLL_MIN: -30,
        };
    };
    Inheritance.inheritPrototype(HorizonIndicator, IndicatorBase);
    /** 
     * @param {Number} pitch - pitch value of aircraft -> range from 40 to -40
     * @param {Number} roll - roll value of aircraft -> range from 30 to -30
     */
    HorizonIndicator.prototype.update = function (pitch, roll) {
        if (this.isReady) {
            var pixelBound = this.pixelBounds;

            pitch = pitch > pixelBound.PITCH_MAX ? pixelBound.PITCH_MAX : pitch;
            pitch = pitch < pixelBound.PITCH_MIN ? pixelBound.PITCH_MIN : pitch;

            roll = roll > pixelBound.ROLL_MAX ? pixelBound.ROLL_MAX : roll;
            roll = roll < pixelBound.ROLL_MIN ? pixelBound.ROLL_MIN : roll;

            var center = this.getElementCenter(this.horizonElement);
            this.horizonElement.attributes.transform.nodeValue = "translate(0, " + pixelBound.PIXELS_PER_PITCH * pitch + ")" + " rotate(" + roll + " " + center.x + " " + center.y + ")";
            /* this.horizonElement.attributes.transform.nodeValue = "rotate(" + roll + " " + center.x + " " + center.y + ")"; */
        }
    };
    return HorizonIndicator;
});
/* 
128   -> 40
  1   ->  0,3125
  3,2 ->  1



-128 -> -40 
*/