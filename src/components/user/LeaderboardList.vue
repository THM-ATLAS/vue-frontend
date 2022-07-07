<template>
  <v-card elevation="0" rounded="0" class="hide-links">
    <!--v-img
        id="treppchen"
        src="../assets/treppchen.svg"
        max-height="200px"
    ></v-img-->
    <div id="podium-wrapper">
      <v-container id="podium">
        <div>
            <span v-if="persons.length > 1"><v-icon icon="mdi-trophy" color="#707b87"/>
              <a :href="'/user/' + persons[1].username" v-html="persons[1].name"/> : {{ persons[1].score }}
            </span>
          <div id="step-2" v-if="persons.length > 1"/>
        </div>
        <div>
            <span v-if="persons.length > 0"><v-icon icon="mdi-trophy" color="#ab7d00"/>
              <a :href="'/user/' + persons[0].username" v-html="persons[0].name"/> : {{ persons[0].score }}
            </span>
          <div id="step-1" v-if="persons.length > 0"/>
        </div>
        <div>
            <span v-if="persons.length > 2"><v-icon icon="mdi-trophy" color="#996b63"/>
              <a :href="'/user/' + persons[2].username" v-html="persons[2].name"/> : {{ persons[2].score }}
            </span>
          <div id="step-3" v-if="persons.length > 2"/>
        </div>
      </v-container>
    </div>
    <v-list v-if="persons.length > 3">
      <v-col>
        <v-list-item style="font-weight: bold">
          Platz
          <v-spacer/>
          Name
          <v-spacer/>
          Punktzahl
        </v-list-item>
        <v-list-item v-for="person in persons.slice(3)" v-bind:key="person.id">
          {{ persons.indexOf(person) + 1 }}
          <v-spacer/>
          <a v-if="person.username === user_id" :href="'/user/' + person.username" style="font-weight: bold"
             v-html="'Ich'"/>
          <a v-else :href="'/user/' + person.username" v-html="person.name"/>
          <v-spacer/>
          {{ person.score }}
        </v-list-item>
      </v-col>
    </v-list>
  </v-card>
</template>

<style scoped>
</style>

<script lang='ts'>
import {defineComponent, mergeProps} from "vue";

export default defineComponent({
  name: "LeaderboardList",
  methods: {mergeProps},
  setup() {

    const user_id = 'person2'; // should get this from LDAP

    let persons = [
      {
        id: 0,
        name: "Person 1",
        username: "person1",
        score: 10,
      },
      {
        id: 1,
        name: "Person 2",
        username: "person2",
        score: 30,
      },
      {
        id: 2,
        name: "Person 3",
        username: "person3",
        score: 50,
      },
      {
        id: 3,
        name: "Person 4",
        username: "person4",
        score: 99,
      },
      {
        id: 4,
        name: "Person 5",
        username: "person5",
        score: 50,
      },
      {
        id: 5,
        name: "Person 6",
        username: "person6",
        score: 79,
      },
      {
        id: 6,
        name: "Person 7",
        username: "person7",
        score: 48,
      },
      {
        id: 7,
        name: "Person 8",
        username: "person8",
        score: 56,
      },
      {
        id: 8,
        name: "Person 9",
        username: "person9",
        score: 79,
      },
    ].sort(function (a, b) {
      return b.score - a.score;
    });

    return {persons, user_id};
  },
});
</script>
<style>

.hide-links a {
  text-decoration: none;
  color: inherit;
}

#podium {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}

#podium > div {
  width: 30%;
  padding-left: 1em;
  padding-right: 1em;
}

#podium-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

#step-1 {
  min-height: 100px;
  background-color: #ab7d00;
}

#step-2 {
  min-height: 60px;
  background-color: #707b87;
}

#step-3 {
  min-height: 35px;
  background-color: #996b63;
}
</style>