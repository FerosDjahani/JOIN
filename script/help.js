function imgscale(img) {
    let src;
    document.getElementById('scaled_img').classList.remove('d-none');
    document.getElementById('scaled_img').classList.add('scaled_img');
    document.getElementById('scaled_img_path').src = img;
}

function closeScaledImg() {
    document.getElementById('scaled_img').classList.add('d-none');
}