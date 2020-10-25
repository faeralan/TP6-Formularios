<template>

  <section class="src-components-formulario">
    <div class="container mt-top">
      
        <div class="col-md-8">
          <div class="card">
              <h5 class="card-header">Formulario</h5>
              <div class="card-body">
                <form novalidate autocomplete="off" @submit.prevent="enviar()">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" class="form-control" v-model="$v.f.nombre.$model">
                  </div>
                  <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger">
                    <!--
                    <div>
                      {{$v.f.nombre}}
                    </div>
                    -->
                    <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.nombre.minLength.$invalid">Este campo debe tener 5 caracteres como minimo</div>
                    <div v-else-if="$v.f.nombre.maxLength.$invalid">Este campo debe tener 15 caracteres como maximo</div>
                  </div>
                  <div class="form-group">
                    <label for="edad">Edad</label>
                    <input type="text" id="edad" class="form-control" v-model="$v.f.edad.$model">
                  </div>
                  <div v-if="$v.f.edad.$error && $v.f.edad.$dirty" class="alert alert-danger">
                    <div v-if="$v.f.edad.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.edad.between.$invalid">La edad debe ser mayor a {{$v.f.edad.between.$params.min}} y menor a {{$v.f.edad.between.$params.max}}</div>
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" class="form-control" v-model="$v.f.email.$model">
                  </div>
                  <div v-if="$v.f.email.$error && $v.f.email.$dirty" class="alert alert-danger">
                    <div v-if="$v.f.email.required.$invalid">Este campo es requerido</div>
                    <div v-else-if="$v.f.email.email.$invalid">El formato de este campo es invalido</div>
                  </div>
                  <div class="form-group">
                    <input class="btn btn-success btn-md" type="submit" value="Enviar" :disabled="!(!$v.f.$invalid && $v.f.email.$dirty && $v.f.edad.$dirty && $v.f.nombre.$dirty)">
                  </div>
                </form>
              </div>
          </div>
        </div>
      
    </div>
  </section>

</template>

<script>
  import { email, required, maxLength, minLength, between } from '@vuelidate/validators'

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {

    },
    data () {
      return {
        f: this.resetCampos(),
        url: 'https://5f9509db2de5f50016ca1c9d.mockapi.io/api/v1/usuarios',
      }
    },
    validations: {
      f: {
        nombre: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        },
        edad: {
          required,
          between: between(18, 120)

        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      async sendDatosForm(datos) {
        try {
          await this.axios.post(this.url, datos, {
            'content-type': 'application/json'
          })
        } catch (error) {
          console.error(error)
        }
      },
      enviar() {
        let datosForm = {
          nombre: this.$v.f.nombre.$model,
          edad: this.$v.f.edad.$model,
          email: this.$v.f.email.$model
        }
        
        this.sendDatosForm(datosForm);
        this.f = this.resetCampos();
        this.$v.$reset();
        
      },
      resetCampos() {
        return {
          nombre: '',
          edad: '',
          email: ''
        }
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {

  }
  .mt-top{
    margin-top: 50px;
  }
  label{
    float: left;
  }
</style>
