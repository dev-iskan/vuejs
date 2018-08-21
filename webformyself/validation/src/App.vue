<template>
    <div id="app" class="container">
        <div class="row">
            <!--<form class="form-group pt-4">
                <label for="email">Email</label>
                <input type="email"
                       id="email"
                       class="form-control"
                       :class="{'is-invalid' : $v.email.$error}"
                       @blur="$v.email.$touch()"
                       v-model="email">
                <div v-if="!$v.email.required" class="invalid-feedback">
                    Email field is required!
                </div>
                <div v-if="!$v.email.email" class="invalid-feedback">
                    This field should be email!
                </div>
            </form>-->

            <!--<form class="form-group pt-4">
                <label for="password">Password</label>
                <input type="password"
                       id="password"
                       class="form-control"
                       :class="{'is-invalid' : $v.password.$error}"
                       @blur="$v.password.$touch()"
                       v-model="password">
                <div v-if="!$v.password.minLength" class="invalid-feedback">
                    Min length for password is {{$v.password.$params.minLength.min}}. Now it is {{password.length}}
                </div>
                <div v-if="!$v.password.required" class="invalid-feedback">
                    Password field is required!
                </div>
                <label for="confirm_password">Confirm Password</label>
                <input type="password"
                       id="confirm_password"
                       class="form-control"
                       :class="{'is-invalid' : $v.confirm_password.$error}"
                       @blur="$v.confirm_password.$touch()"
                       v-model="confirm_password">
                <div v-if="!$v.confirm_password.sameAs" class="invalid-feedback">
                    Password should match!
                </div>
                <div v-if="!$v.confirm_password.required" class="invalid-feedback">
                    Password field is required!
                </div>
            </form>-->

            <form class="pt-4" @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email"
                           id="email"
                           class="form-control"
                           :class="{'is-invalid' : $v.email.$error}"
                           @blur="$v.email.$touch()"
                           v-model="email">
                    <div v-if="!$v.email.required" class="invalid-feedback">
                        Email field is required!
                    </div>
                    <div v-if="!$v.email.email" class="invalid-feedback">
                        This field should be email!
                    </div>
                    <div v-if="!$v.email.uniqueEmail" class="invalid-feedback">
                        This email already exists!
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password"
                           id="password"
                           class="form-control"
                           :class="{'is-invalid' : $v.password.$error}"
                           @blur="$v.password.$touch()"
                           v-model="password">
                    <div v-if="!$v.password.minLength" class="invalid-feedback">
                        Min length for password is {{$v.password.$params.minLength.min}}. Now it is {{password.length}}
                    </div>
                    <div v-if="!$v.password.required" class="invalid-feedback">
                        Password field is required!
                    </div>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Confirm Password</label>
                    <input type="password"
                           id="confirm_password"
                           class="form-control"
                           :class="{'is-invalid' : $v.confirm_password.$error}"
                           @blur="$v.confirm_password.$touch()"
                           v-model="confirm_password">
                    <div v-if="!$v.confirm_password.sameAs" class="invalid-feedback">
                        Password should match!
                    </div>
                    <div v-if="!$v.confirm_password.required" class="invalid-feedback">
                        Password field is required!
                    </div>
                </div>
                <button type="submit" class="btn btn-success mt-3" :disabled="$v.$invalid">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'

    export default {
        name: 'app',
        data() {
            return {
                email: '',
                password: '',
                confirm_password: ''
            }
        },
        methods: {
          onSubmit(){
                console.log(this.email);
                console.log(this.password);
            }
        },
        validations: {
            email: {
                required,
                email,
                uniqueEmail: function (newEmail) {
                    if (newEmail === '') return true;
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            let value = newEmail !== 'test@mail.ru';
                            resolve(value)
                        }, 1000)
                    })

                    // return newEmail !== 'test@mail.ru'
                }
            },

            password: {
                required,
                minLength: minLength(6)
            },
            confirm_password: {
                required,
                sameAs: sameAs((vue) => {
                    return vue.password
                })
            }
        }
    }
</script>

<style>
</style>
