<template>

    <div>
        <div class="navigationbar">
            <navigationbar/>
        </div>

        <div class="container" style="padding-top:50px" v-if="Object.keys(series).length > 0">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Episodes</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :key="series._id" v-for="serie in series">
                        <th align="center">{{serie.name}}</th>
                        <th align="center"> {{serie.year}}</th>
                        <th align="center">{{serie.episodes}}</th>
                        <td class="text-right">
                            <router-link :to="{name: 'edit', params: { id: serie._id }}"
                                         class="btn btn-outline-primary mr-3">
                                Edit
                            </router-link>
                            <button @click.prevent="deleteSerie(serie.name,serie._id)"
                                    class="btn btn-outline-danger mr-3">
                                Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="container" style="padding-top:50px" v-if="Object.keys(series).length <= 0">
            <p>No series found in the database</p>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import swal from "sweetalert2";
    import navigationbar from "@/components/navigationbar";

    export default {
        data: () => ({
            series: []
        }),
        created: function () {
            this.fetchData();
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
            fetchData: function () {
                this.$http.get('http://localhost:4000/series/')
                    .then(response => {
                        this.series = response.data
                        console.log(this.series)
                    })
            },
            deleteSerie(name, id) {
                let apiURL = `http://localhost:4000/series/${id}`;
                let self = this;
                const swalDialogBootstrap = swal.mixin({
                    customClass: {
                        cancelButton: 'btn btn-success mr-2',
                        confirmButton: 'btn btn-danger mr-2'
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
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true,
                        dangerMode: true,
                    }).then((result) => {
                        if (result.value) {
                            axios.delete(apiURL)
                                .then(function () {
                                    swalButtonsBootsrap.fire("Success", "Serie (" + name + ") was deleted successfully", "success")
                                        .then(function () {
                                            self.$router.go();
                                        })
                                });
                        } else {
                            swalButtonsBootsrap.fire("Cancelled", "This entry (" + name + ") was not deleted", "error");
                        }
                    })
                } catch (err) {
                    console.log(error);
                }

            }
        }

    };
</script>

<style scoped>

</style>