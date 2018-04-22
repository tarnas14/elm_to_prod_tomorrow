port module Main exposing (..)

import Html exposing (Html, div, button, text, br)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)

---- MODEL ----


type alias Todo = {
  id: Int,
  title: String
}

type alias Model = { todos: List Todo }

init : ( Model, Cmd Msg )
init =
    ( Model []
    , Cmd.none
    )



---- UPDATE ----


type Msg
    = NoOp
    | Done Int
    | Focus (List Todo)

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp -> (model, Cmd.none)
        Focus todos -> (Model todos, Cmd.none)
        Done todoId -> (model.todos |> List.filter (\todo -> todo.id /= todoId) |> Model, done todoId)


---- VIEW ----


view : Model -> Html Msg
view model =
    if List.isEmpty model.todos then
      div [] []
    else 
    Html.ul [
      style [("margin", "0"), ("position", "fixed"), ("top", "0"), ("left", "0"), ("right", "0"), ("bottom", "0"), ("backgroundColor", "white"), ("zIndex", "9001")]
    ] <| showTodos model.todos
          

showTodos: (List Todo) -> List (Html Msg)
showTodos todos = todos |> List.map (\todo -> Html.li [] [
  todo.title |> text,
  Html.span [onClick <| Done todo.id] [" ->x<-" |> text] ])

---- PROGRAM ----

port todos: (List Todo -> msg) -> Sub msg
port done: Int -> Cmd msg

subscriptions model = todos Focus

main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }
