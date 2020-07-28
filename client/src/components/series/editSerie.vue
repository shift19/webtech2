<template>
    <div>
        <div class="navigationbar">
            <navigationbar/>
        </div>

        <div class="row justify-content-center" style="margin-top:50px;height:auto;padding-top:100px !important;">
            <div class="col-md-6">
                <h3 class="text-center">Update</h3>
                <form @submit.prevent="handleUpdateForm">
                    <div class="form-group">
                        <label>Name</label>
                        <input class="form-control" required type="text" v-model="serie.name">
                    </div>

                    <div class="form-group">
                        <label>Year</label>
                        <input class="form-control" required type="number" v-model="serie.year">
                    </div>

                    <div class="form-group">
                        <label>Episodes</label>
                        <input class="form-control" required type="number" v-model="serie.episodes">
                    </div>
                    <p/>
                    <div class="form-group">
                        <button class="btn btn-danger btn-block mr-3">Update</button>
                    </div>
                </form>
                <router-link class="btn btn-outline-primary btn-block mr-3" to="/listSeries"
                >Back
                </router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import swal from "sweetalert2";
    import navigationbar from "@/components/navigationbar";

    export default {
        data() {
            return {
                serie: {}
            }
        },
        created() {
            let apiURL = `http://localhost:4000/series/${this.$route.params.id}`;

            axios.get(apiURL).then((res) => {
                this.serie = res.data;
            })
        },
        components: {
            navigationbar
        },
        methods: {
            logUserOut() {
                localStorage.removeItem("jwt");
                this.$router.push("/");
            },
            create() {
                this.$router.push("/createSerie");
            },
            list() {
                this.$router.push("/listSeries");
            },
            home() {
                this.$router.push("/home");
            },
            handleUpdateForm() {
                let apiURL = `http://localhost:4000/series/${this.$route.params.id}`;
                let self = this;
                const swalDialogBootstrap = swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success mr-2',
                        cancelButton: 'btn btn-danger mr-2'
                    },
                    buttonsStyling: false
                })
                const swalButtonsBootsrap = swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary mr-2',
                    },
                    buttonsStyling: false
                })
                try {
                    swalDialogBootstrap.fire({
                        title: "Are you sure?",
                        text: "You will not be able to recover this entry!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: 'Yes, modify it!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true,
                        dangerMode: true,
                    }).then((result) => {
                        if (result.value) {
                            axios.patch(apiURL, self.serie)
                                .then(function () {
                                    swalButtonsBootsrap.fire("Success", "Serie (" + self.serie.name + ") was modified successfully", "success")
                                    self.$router.push("/listSeries");
                                })
                        } else {
                            swalButtonsBootsrap.fire("Cancelled", "This entry (" + self.serie.name + ") was not modified", "error");
                        }
                    })

                } catch (err) {
                    console.log(error);
                }

                /*
                                axios.patch(apiURL, this.serie).then((res) => {
                                    console.log(res)
                                    swal("Success", "Serie (" + this.serie.name + ") was updated successfully", "success");
                                    this.$router.push('/listSeries')
                                }).catch(error => {
                                    console.log(error)
                                });
                 */
            }
        }
    }
</script>