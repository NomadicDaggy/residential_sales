class Pmt < ActiveRecord::Migration[5.0]
  def up
  	connection.execute(%q{
    CREATE OR REPLACE FUNCTION pmt(
		  interest double precision,
		  principal integer)
		RETURNS numeric AS $$
		  SELECT ROUND(CAST((interest/100/12 * principal) / (1 - ((1 + (interest/100/12)) ^ -360)) AS numeric), 0)
		$$ LANGUAGE SQL;
  }) 	
  end
end
