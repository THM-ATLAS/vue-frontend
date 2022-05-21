import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
    theme: string
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({

    //exemplary implementation of states and mutations
    state: {
        theme: "light"
    },
    mutations: {
        switchTheme (state) {
            state.theme === "light" ? state.theme = "dark" : state.theme = "light"
        }
    }
})