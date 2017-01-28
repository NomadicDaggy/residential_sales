class ResidentialController < ApplicationController
  def index
  end

  def bar_chart
  end

  def data
    totals = SalesFigure.group(:jurisdiction).sum(:total_sales)
    render :json => { :totals => totals }
  end
end