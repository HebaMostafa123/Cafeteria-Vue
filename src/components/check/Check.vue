<template>
<div class="container-fluid mt-2">
  <form>
  <div class="form-row">
    <div class="form-group col-md-5">
      <input type="date" class="form-control" id="inputDateFrom" placeholder="Date From">
    </div>
    <div class="form-group col-md-5">
      <input type="date" class="form-control" id="inputPassword4">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>