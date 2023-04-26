(function(window, opspark, racket, asdf) {
  /**
   * Creates and returns the space module. Listens for SPAWN 
   * events, adding any bodies in the event
   * @param {Object} messenger: The system wide event dispatcher.
   */
  opspark.space = function(messenger) {
    // holds all bodies active in our space //
    const 
      dampeningForce = 0.08,
      active = [];

    messenger.on('SPAWN', onSpawn);
    function onSpawn(event) {
      add(...event.bodies);
    }
    
    function add(...bodies) {
      active.push(...bodies);
      return this;
    }

    function remove(body) {
      return active.splice(active.indexOf(body), 1)[0];
    }

    return {
      add,
      remove,
      destroy() {
        messenger.off('SPAWN', onSpawn);
      },
      update(event) {
        active.forEach(body => {
          // ask the body to update its velocity //
          body.update(event);
          
          // update the body's position based on its new velocity //
          racket.physikz.updatePosition(body);
        });

        // loop backwards over each body in the space: note i > 0 //
        for (let i = active.length - 1; i > 0; i--) {
          // pull out each body one by one //
          const bodyA = active[i];

          // compare all other bodies to bodyA, excluding bodyA: note j > -1 //
          hit: for (let j = i - 1; j > -1; j--) {
            const bodyB = active[j];
            
            // TODO 1: Calculate hit test components
            const distance = asdf.phyz.getDistance(bodyA, bodyB);
            const minDistance = bodyA.radius + bodyB.radius;
              
            // TODO 2: Do collision check: how do we know if bodies are colliding?
            if(distance <= (bodyA.radius + bodyB.radius) ) {
              // console.log('hit!');
              
              // TODO 3: Calculate springToX and springToY 
              var  angle = asdf.numz.getAngleDegrees(bodyA, bodyB);
              springToX = (Math.cos(angle) * minDistance) + bodyA.x;
              springToY = (Math.sin(angle) * minDistance) + bodyA.y;
                // console.log(springToX);
                // console.log(springToY);

              // TODO 4: Calculate acceleration to spring-to point, factor in dampeningForce
             var accelerationOnX = (bodyA.x - springToX) * dampeningForce;
             var accelerationOnY = (bodyA.y - springToY) * dampeningForce;

             bodyA.velocityX = bodyA.velocityX + accelerationOnX;
             bodyA.velocityY = bodyA.velocityY + accelerationOnY;

             bodyB.velocityX = bodyB.velocityX -  accelerationOnX;
             bodyB.velocityY = bodyB.velocityY - accelerationOnY;
              // TODO 5: Apply acceleration to bodyB
              
              
              
              // TODO 6: Apply inverse acceleration to bodyA
              
              
              
            }
          }
        }
      }
    };
  };
}(window, window.opspark, window.opspark.racket, window.asdf));
