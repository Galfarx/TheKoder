export default function centerGameObjectsc(objects) {
  objects.forEach((object) => {
    object.anchor.setTo(0.5);
  });
}
