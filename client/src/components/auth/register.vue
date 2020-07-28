<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form
                        @submit.prevent="registerUser"
                        class="text-center border border-primary p-5"
                        style="margin-top:70px;height:auto;padding-top:100px !important;"
                >
                    <p>Name</p>
                    <input
                            class="form-control mb-5"
                            id="name"
                            placeholder="Name"
                            required
                            type="text"
                            v-model="register.name"
                    />
                    <p>E-mail</p>
                    <input
                            class="form-control mb-5"
                            id="email"
                            placeholder="Email"
                            required
                            type="email"
                            v-model="register.email"
                    />

                    <p>Password</p>
                    <!-- Password -->
                    <input
                            class="form-control mb-5"
                            id="password"
                            placeholder="Password"
                            type="password"
                            v-model="register.password"
                    />

                    <!-- Sign in button -->
                    <center>
                        <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                            Register
                        </button>


                        <p>
                            <router-link class="btn btn-outline-primary btn-block w-75 my-4" to="/"
                            >Back to login
                            </router-link
                            >
                        </p>
                    </center>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from "sweetalert2";

    export default {
        data() {
            return {
                register: {
                    name: "",
                    email: "",
                    password: ""
                }
            };
        },
        methods: {
            async registerUser() {

                const swalWithBootstrapButtons = swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false
                })
                try {
                    let response = await this.$http.post("/user/register", this.register);
                    console.log(response);
                    let token = response.data.token;
                    if (token) {
                        localStorage.setItem("jwt", token);
                        this.$router.push("/");
                        swalWithBootstrapButtons.fire("Success", "Registration successful.", "success");
                    } else {
                        swalWithBootstrapButtons.fire("Error", "Something went wrong", "error");

                    }
                } catch (err) {
                    let error = err.response;
                    if (error.status == 409) {
                        swalWithBootstrapButtons.fire("Error", error.data.message, "error");
                    } else {
                        swalWithBootstrapButtons.fire("Error", error.data.err.message, "error");
                    }
                }
            }
        }
    };
</script>
