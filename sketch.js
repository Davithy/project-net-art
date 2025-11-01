function autoScroll() {
  const element = document.getElementById("option2");
  element.scrollIntoView({ inline: 'center', block: 'center' });
  loadBackground();
}

function loadBackground() {
  const saved = sessionStorage.getItem('myColor');

  if (saved) {
    const color = JSON.parse(saved);

    const colorshift = document.querySelector('.colorshift');
    colorshift.style.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }
}

window.addEventListener('load', function () {
  const page = window.location.pathname;
  if (page.includes('index.html')) {
    sessionStorage.removeItem('myColor');
  }

  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      if (page.includes('choice8.html')) {
        return;
      }

      const buttonColor = window.getComputedStyle(this).backgroundColor;

      const cleaned = buttonColor.replace('rgb(', '').replace(')', '');
      const parts = cleaned.split(', ');
      const newR = parseInt(parts[0]);
      const newG = parseInt(parts[1]);
      const newB = parseInt(parts[2]);

      const saved = sessionStorage.getItem('myColor');
      let finalR, finalG, finalB, finalA;

      if (saved) {
        const old = JSON.parse(saved);
        finalR = Math.round((old.r + newR) / 2);
        finalG = Math.round((old.g + newG) / 2);
        finalB = Math.round((old.b + newB) / 2);
        finalA = old.a + 0.125;
      } else {
        finalR = newR;
        finalG = newG;
        finalB = newB;
        finalA = 0.125;
      }

      sessionStorage.setItem('myColor', JSON.stringify({
        r: finalR,
        g: finalG,
        b: finalB,
        a: finalA
      }));
    });
  });

  loadBackground();
});