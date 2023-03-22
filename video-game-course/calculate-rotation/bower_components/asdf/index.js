(function (window, _) {
  window.asdf = window.asdf || {
    numz: {
      
      /**
             * Turns degrees into radians
             * @param {number} degrees 
             * @returns {number} the degrees in radians
             */
      degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    },
    /**
     * Turns radians into degrees
     * @param {number} radians 
     * @returns {number} the degrees in radians
     */
    radiansToDegrees(radians){
        return radians * 180 / Math.PI;
    },
    /**
     * Calculates the angle between two points
     * @param {object} pointA
     * @param {number} pointA.x - x value of pointA
     * @param {number} pointA.y - y value of pointA
     * @param {object} pointB
     * @param {number} pointB.x - x value of pointB
     * @param {number} pointB.y - y value of pointB
     * @returns {number} Angle between the two points in degrees. Value range: -180 to 180
     */
    getAngleDegrees(pointA, pointB){
        const
            distanceX = pointB.x - pointA.x,
            distanceY = pointB.y - pointA.y,
            radians = Math.atan2(distanceY, distanceX),
            degrees = radians * 180 /Math.PI;
        return degrees;


    }



    },
    phyz: {
      /**
       *
       * @param {object} pointA - The first point
       * @param {object} pointB - The second point
       * @param {number} pointB.x - Point B's X value
       * @param {number} pointB.y - Point B's Y value
       * @param {number} pointA.x - Point A's X value
       * @param {number} pointA.y - Point A's Y value
       * @returns {number} - Returns the distance between point A and point B
       */
      getDistance(pointA, pointB) {
        const distanceX = pointB.x - pointA.x,
          distanceY = pointB.y - pointA.y,
          distance = Math.sqrt(distanceX * distanceX - distanceY * distanceY);
        return distance;
      },
      /**
       * Returns an Object with basic properties utilized in a
       * 2D physics system. On top of simple physical properties,
       * the body has template methods handleCollision() and update().
       *
       * @param {String} type: A String, should be unique to your
       * system, representing the type of body.
       * @param {Object} options.
       * @param {Number} options.velocityX: The body's velocity on the x axis.
       * @param {Number} options.velocityY: The body's velocity on the y axis.
       * @param {Number} options.rotationalVelocity: The body's rotational velocity.
       * @param {Number} options.integrity: The body's integrity. 0 means the
       * body is no longer intact and should explode or break apart, 1 means
       * the body is fully intact.
       * @param {Number} options.density: The density of the body, can be
       * used when calculating the force of impact of a collision, which can
       * then be distributed to affect the kinetic energy of the colliding bodies.
       * @param {Number} options.volatility: The body's volatility, how unstable or
       * explosive it may be. Can be used as a multiplyer when calculating the
       * force of impact of a collision.
       * @return {Object} The body.
       */
      makeBody: function (
        type,
        {
          velocityX = 0,
          velocityY = 0,
          rotationalVelocity = 0,
          integrity = 1,
          density = 1,
          volatility = 0,
        } = {}
      ) {
        if (type === undefined)
          throw new Error(
            "You must provide a valid String for the type parameter!"
          );
        return {
          type: type,
          velocityX: velocityX,
          velocityY: velocityY,
          rotationalVelocity: rotationalVelocity,
          integrity: integrity,
          density: density,
          volatility: volatility,

          /**
           * @param {Number} A number representing the force of the impact.
           * @param {Object} The other body involved in the collision.
           */
          handleCollision(impact, body) {
            // template method //
          },

          /**
           * Can be overridden in the concrete body to provide a custom update()
           * method.
           */
          update(event) {
            // template method //
          },
        };
      },
    },
  };
})(window, window._);

