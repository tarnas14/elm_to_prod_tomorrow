port module Main exposing (..)

import Html exposing (Html, div, button, text, br)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)


---- MODEL ----


type alias Todo =
    { id : Int
    , title : String
    }


type alias Model =
    { todos : List Todo }


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
        NoOp ->
            ( model, Cmd.none )

        Focus todos ->
            ( Model todos, Cmd.none )

        Done todoId ->
            ( model.todos |> List.filter (\todo -> todo.id /= todoId) |> Model, done todoId )



---- VIEW ----


view : Model -> Html Msg
view model =
    if List.isEmpty model.todos then
        div [] []
    else
        Html.div
            [ style [ ( "position", "fixed" ), ( "top", "0" ), ( "left", "0" ), ( "right", "0" ), ( "bottom", "0" ), ( "backgroundColor", "white" ), ( "zIndex", "9001" ) ]
            ]
            [ Html.h2 [ style [ ( "textAlign", "center" ), ( "color", "#988e9e" ) ] ] [ "Focus mode, there is no escape" |> text ]
            , Html.ul
                [ style
                    [ ( "padding", "0" )
                    , ( "listStyleType", "none" )
                    , ( "width", "50%" )
                    , ( "margin", "2em auto" )
                    , ( "textAlign", "center" )
                    , ( "fontSize", "2em" )
                    ]
                ]
              <|
                showTodos model.todos
            ]


showTodos : List Todo -> List (Html Msg)
showTodos todos =
    todos |> List.map showTodo


showTodo : Todo -> Html Msg
showTodo todo =
    Html.li
        [ style [ ( "margin", "0" ), ( "marginBottom", "1em" ), ( "color", "#988e9e" ), ( "padding", "0" ) ]
        , onClick <| Done todo.id
        ]
        [ todo.title |> text ]



---- PROGRAM ----


port todos : (List Todo -> msg) -> Sub msg


port done : Int -> Cmd msg


subscriptions model =
    todos Focus


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }
