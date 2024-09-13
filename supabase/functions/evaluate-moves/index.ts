// Supabase Edge Function: evaluate-moves

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Initialize the Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  const { gameID, color } = await req.json()

  if (!gameID || !color || (color !== 'w' && color !== 'b')) {
    return new Response(JSON.stringify({ error: 'Invalid input parameters' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    // Fetch the current game state
    const { data: game, error: gameError } = await supabase
      .from('games')
      .select('*')
      .eq('game_id', gameID)
      .single()

    if (gameError) throw gameError

    // Fetch move selections for the specified color
    const { data: moveSelections, error: moveSelectionsError } = await supabase
      .from('move_selections')
      .select('*')
      .eq('game_id', gameID)
      .in('player_name', color === 'w' ? ['w_one', 'w_two'] : ['b_one', 'b_two'])

    if (moveSelectionsError) throw moveSelectionsError

    // Check if both players of the specified color have submitted moves
    if (moveSelections.length !== 2) {
      return new Response(JSON.stringify({ message: 'Waiting for all players to submit moves' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      })
    }

    // Randomly select one of the two moves
    const selectedMove = moveSelections[Math.floor(Math.random() * 2)]

    // Update the game state
    const { error: updateError } = await supabase
      .from('games')
      .update({
        fen: selectedMove.suggested_fen,
        current_team: color === 'w' ? 'b' : 'w',
        updated_at: new Date().toISOString(),
      })
      .eq('game_id', gameID)

    if (updateError) throw updateError

    return new Response(JSON.stringify({ 
      message: 'Move evaluated and game updated successfully',
      selectedMove: selectedMove.player_name,
      newFen: selectedMove.suggested_fen
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})