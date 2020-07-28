<template>
    <div>
        <div class="navigationbar">
            <navigationbar/>
        </div>

        <section>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-12">
                        <p>User logged in:</p>
                        <ul class="list-group">
                            <li class="list-group-item">Name: {{ user.name }}</li>
                            <li class="list-group-item">Email: {{ user.email }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
    import navigationbar from "@/components/navigationbar";
    import VueJwtDecode from "vue-jwt-decode";

    export default {
        data() {
            return {
                user: {}
            };
        },
        components: {
            navigationbar
        },
        methods: {
            getUserDetails() {
                let token = localStorage.getItem("jwt");
                let decoded = VueJwtDecode.decode(token);
                this.user = decoded;
            },
        },

        created() {
            this.getUserDetails();
        }
    };
</script>

<style scoped></style>
