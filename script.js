<script>
    document.querySelector('.cta-button').addEventListener('click', function() {
        document.body.style.setProperty('--bottom-color', '#yourColorHere'); // Adjust the color if needed
        document.querySelector('body::after').style.bottom = 0;
    });
</script>
