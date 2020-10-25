<template>
  <section class="src-components-usuarios">
    <div class="container mt-top">
      <table class="table table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Edad</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody v-if="usuarios.length > 0">
          <tr v-for="(dato, i) in usuarios" :key="i">
              <td>{{ dato.id }}</td>
              <td>{{ dato.nombre }}</td>
              <td>{{ dato.edad }}</td>
              <td>{{ dato.email }}</td>
          </tr>
        </tbody>
        <tbody v-else-if="usuarios.length == 0">
          <tr>
            <td colspan="4">
              <div class="alert alert-danger">No hay usuarios disponibles</div>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-usuarios',
    props: [],
    mounted () {
      this.getUsuarios()
    },
    data () {
      return {
        url: 'https://5f9509db2de5f50016ca1c9d.mockapi.io/api/v1/usuarios',
        usuarios: [],
      }
    },
    methods: {
       async getUsuarios() {
        try {
          let data = await this.axios.get(this.url, {
            'content-type': 'application/json'
          })
          this.usuarios = data.data;
        } catch (error) {
          console.error(error)
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-usuarios {

  }
  .mt-top{
    margin-top: 50px;
  }
</style>
