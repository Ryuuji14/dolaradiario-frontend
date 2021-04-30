<script>
  export let description, logo;
</script>

<div class="description-container">
  <p>{logo}</p>
  <p>{description}</p>
</div>

<style>
  .description-container {
    height: 150px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  .description-container > p {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
    font-size: 18px;
  }
</style>
