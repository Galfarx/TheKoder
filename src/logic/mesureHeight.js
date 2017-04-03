let highestReachedPoint = 0;

function calculateHeight(playerY, gameY) {
  return Math.abs(playerY - gameY);
}

export default function getPlayerHighestPoing(playerY, gameY) {
  let playerCurrentHeight = calculateHeight(playerY, gameY);
  if (highestReachedPoint < playerCurrentHeight) {
    highestReachedPoint = playerCurrentHeight;
  }
  return Math.floor(highestReachedPoint);
}
