function generateImage() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const imageInputs = [
        document.getElementById("image3"),
        document.getElementById("image1"),
        document.getElementById("image2"),
        document.getElementById("image6"),
        document.getElementById("image4"),
        document.getElementById("image5"),
        document.getElementById("image9"),
        document.getElementById("image7"),
        document.getElementById("image8")
    ];

    const size = 300; // Each image size
    canvas.width = size * 3;
    canvas.height = size * 3;

    let images = [];
    let loadCount = 0;

    imageInputs.forEach((input, index) => {
        if (input.files.length > 0) {
            const img = new Image();
            img.src = URL.createObjectURL(input.files[0]);
            img.onload = function () {
                images[index] = img;
                loadCount++;
                if (loadCount === imageInputs.filter(input => input.files.length > 0).length) {
                    drawImages(ctx, images, size);
                }
            };
        }
    });
}

function drawImages(ctx, images, size) {
    images.forEach((img, index) => {
        if (img) {
            const x = (index % 3) * size;
            const y = Math.floor(index / 3) * size;
            ctx.drawImage(img, x, y, size, size);
        }
    });
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink)
    downloadLink.href = document.querySelector("canvas").toDataURL("image/png");
    downloadLink.download = "How_I_See_MySelf.png";
    downloadLink.style.display = "block";
    downloadLink.click();
    downloadLink.remove();
}

document.querySelectorAll('.hidden-input').forEach(input => {
    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const preview = event.target.nextElementSibling;
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.style.backgroundImage = `url(${e.target.result})`;
                preview.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        } else {
            preview.style.backgroundImage = '';
            preview.classList.remove('has-image');
        }
    });
});
