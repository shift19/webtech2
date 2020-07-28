<template>
    <div>
        <div class="navigationbar">
            <navigationbar/>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                    <form
                            @submit.prevent="createSerie"
                            class="p-5"
                            style="margin-top:50px;height:auto;padding-top:100px !important;"
                    >
                        <p>Name</p>
                        <input
                                class="form-control mb-5"
                                id="name"
                                placeholder="Name"
                                required
                                type="text"
                                v-model="serie.name"
                        />

                        <p>Year</p>
                        <input
                                class="form-control mb-5"
                                id="year"
                                placeholder="Year"
                                required
                                type="number"
                                v-model="serie.year"
                        />


                        <p>Episodes</p>
                        <input
                                class="form-control mb-5"
                                id="episodes"
                                placeholder="Episodes"
                                required
                                type="number"
                                v-model="serie.episodes"
                        />
                        <!-- Sign in button -->
                        <center>
                            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                                Add new serie
                            </button>
                        </center>

                    </form>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import swal from "sweetalert2";
    import navigationbar from "@/components/navigationbar";

    export default {
        data() {
            return {
                serie: {
                    name: "",
                    year: "",
                    episodes: ""
                }
            };
        },
        components: {
            navigationbar
        },
        methods: {
            async createSerie() {
                const swalWithBootstrapButtons = swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false
                })
                try {
                    await this.$http.post("/series/", this.serie);
                    swalWithBootstrapButtons.fire("Success", "Serie added successfully", "success");
                    this.$router.push("/home");
                } catch (err) {
                    let error = err.response;
                    swalWithBootstrapButtons.fire("Error", error.data.message, "error");
                    console.log(error);
                }
            },
            logUserOut() {
                localStorage.removeItem("jwt");
                this.$router.push("/");
            },
            list() {
                this.$router.push("/listSeries");
            },
            home() {
                this.$router.push("/home");
            }
        }
    };

</script>

<style scoped>

</style>